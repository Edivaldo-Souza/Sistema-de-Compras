package com.sysCompras.SysCompras.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sysCompras.SysCompras.entities.Produto;
import com.sysCompras.SysCompras.repository.ProdutoRepository;

@Service
public class ProdutoService {
	@Autowired
	ProdutoRepository repository;
	
	public List<Produto> findAll(){
		return repository.findAll();
	}
	
	public Produto findByNome(String obj) {
		return repository.findByNome(obj);
	}
	
	public Produto adicionar(Produto obj){
		obj.setImgPath("vazio");
		repository.save(obj);
		return obj;
	}
	
	public Produto atualizar(Produto obj) {
		obj.setImgPath("vazio");
		repository.save(obj);
		return obj;
	}
	
	public boolean deletar(long id) {
		Produto obj = repository.findById(id);
		if(obj!=null) {
			repository.deleteById(id);
			return true;
		}
		else {
			return false;
		}
	}
}
