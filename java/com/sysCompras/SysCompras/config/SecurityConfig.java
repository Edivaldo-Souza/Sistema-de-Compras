package com.sysCompras.SysCompras.config;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.sysCompras.SysCompras.services.UserDetailsServiceImpl;
import com.sysCompras.SysCompras.filters.LoginFilter;
import com.sysCompras.SysCompras.filters.AuthorizationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled=true)
public class SecurityConfig {
	@Autowired
	private UserDetailsServiceImpl userDetailService;
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	@Bean
	public SecurityFilterChain configure(HttpSecurity http) throws Exception{
		AuthenticationManagerBuilder authManBuilder = http.getSharedObject(AuthenticationManagerBuilder.class);
		authManBuilder.userDetailsService(userDetailService).passwordEncoder(passwordEncoder());
		AuthenticationManager authManager = authManBuilder.build();
		http
		.cors().and().csrf()
		.disable().authorizeHttpRequests()
		.antMatchers(HttpMethod.POST,"/api/usuario").permitAll()
		.anyRequest().authenticated().and()
		.addFilterBefore(new LoginFilter("/api/login",authManager),UsernamePasswordAuthenticationFilter.class)
		.addFilterBefore(new AuthorizationFilter(),UsernamePasswordAuthenticationFilter.class)
		.authenticationManager(authManager)
		.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
		
		http.headers().frameOptions().disable();
		return http.build();
	}
}
