package com.sysCompras.SysCompras.controllers;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sysCompras.SysCompras.services.SaldoService;
import com.sysCompras.SysCompras.entities.Saldo;

@CrossOrigin(maxAge=3600)
@RestController
@RequestMapping("api/saldo")
public class SaldoController {
	@Autowired
	SaldoService service;
	
	@CrossOrigin(origins="http://localhost:3000", allowedHeaders = "*", exposedHeaders = "X-Get-Header")
	@PostMapping
	public  ResponseEntity<Saldo> post(@Valid @RequestBody Saldo obj){
		Saldo s = service.adicionar(obj);
		if(s!=null) {
			return new ResponseEntity<>(s,HttpStatus.CREATED);
		}
		else {
			return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@CrossOrigin(origins="http://localhost:3000", allowedHeaders = "*", exposedHeaders = "X-Get-Header")
	@GetMapping
	public List<Saldo> getAll(){
		return service.getAll();
	}
}
