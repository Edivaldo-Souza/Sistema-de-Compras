package com.sysCompras.SysCompras.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sysCompras.SysCompras.entities.Usuario;
import com.sysCompras.SysCompras.repository.UsuarioRepository;

@Service
public class UsuarioService {
	@Autowired
	UsuarioRepository repository;
	
	public Usuario adicionar(Usuario obj) {
		repository.save(obj);
		return obj;
	}
}
