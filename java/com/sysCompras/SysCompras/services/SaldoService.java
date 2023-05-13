package com.sysCompras.SysCompras.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sysCompras.SysCompras.entities.Saldo;
import com.sysCompras.SysCompras.repository.SaldoRepository;

@Service
public class SaldoService {
	@Autowired
	SaldoRepository repository;
	
	public Saldo adicionar(Saldo obj) {
		return repository.save(obj);
	}
	
	public List<Saldo> getAll(){
		return repository.findAll();
	}
}
