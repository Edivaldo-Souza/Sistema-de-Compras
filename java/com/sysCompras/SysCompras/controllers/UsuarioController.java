package com.sysCompras.SysCompras.controllers;

import javax.validation.Valid;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sysCompras.SysCompras.dto.CriarUsuario;
import com.sysCompras.SysCompras.entities.Usuario;
import com.sysCompras.SysCompras.services.UsuarioService;


@RestController
@RequestMapping("api/usuario")
public class UsuarioController {
	@Autowired
	UsuarioService service;
	
	@Autowired
	ModelMapper mapper;
	
	@PostMapping
	public ResponseEntity<Usuario> post(@Valid @RequestBody CriarUsuario dto){
		Usuario user = mapper.map(dto,Usuario.class);
		if(service.adicionar(user)!=null) {
			return new ResponseEntity<>(user,HttpStatus.CREATED);
		}
		else {
			return new ResponseEntity<>(user,HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
	}
}
