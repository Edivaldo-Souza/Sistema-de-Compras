package com.sysCompras.SysCompras.controllers;

import java.util.List;

import javax.validation.Valid;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sysCompras.SysCompras.services.ProdutoService;
import com.sysCompras.SysCompras.dto.CriarProduto;
import com.sysCompras.SysCompras.entities.Produto;

@CrossOrigin(maxAge=3600)
@RestController
@RequestMapping("api/produto")
public class ProdutoController {
	
	@Autowired
	private ProdutoService service;
	@Autowired
	private ModelMapper mapper;
	
	@CrossOrigin(origins="http://localhost:3000", allowedHeaders = "*", exposedHeaders = "X-Get-Header")
	@PostMapping
	public ResponseEntity<Produto> post(@Valid @RequestBody CriarProduto dto){
		Produto prod = mapper.map(dto,Produto.class);
		if(service.adicionar(prod)!=null) {
			return new ResponseEntity<>(prod,HttpStatus.CREATED);
		}
		else {
			return new ResponseEntity<>(prod,HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
	}
	
	@CrossOrigin(origins="http://localhost:3000", allowedHeaders = "*", exposedHeaders = "X-Get-Header")
	@PutMapping
	public ResponseEntity<Produto> put(@Valid @RequestBody Produto prod){
		if(service.atualizar(prod)!=null) {
			return new ResponseEntity<>(prod,HttpStatus.CREATED);
		}
		else {
			return new ResponseEntity<>(prod,HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
	}
	
	@CrossOrigin(origins="http://localhost:3000", allowedHeaders = "*", exposedHeaders = "X-Get-Header")
	@DeleteMapping("/{id}")
	public String delete(@PathVariable long id) {
		if(service.deletar(id)) {
			return "Produto removido";
		}
		else {
			return "Falha ao remover";
		}
	}
	
	@CrossOrigin(origins="http://localhost:3000", allowedHeaders = "*", exposedHeaders = "X-Get-Header")
	@GetMapping
	public List<Produto> getAll(){
		List<Produto> lista = service.findAll();
		if(lista!=null) {
			return lista;
		}
		return null;
	}
	
	@CrossOrigin(origins="http://localhost:3000", allowedHeaders = "*", exposedHeaders = "X-Get-Header")
	@GetMapping("/{nome}")
	public ResponseEntity<Produto> getByNome(@PathVariable String nome){
		Produto result = service.findByNome(nome);
		if(result!=null) {
			return new ResponseEntity<>(result,HttpStatus.FOUND);
		}
		else {
			return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
		}
	}
}
