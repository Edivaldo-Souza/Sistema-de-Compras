package com.sysCompras.SysCompras.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sysCompras.SysCompras.entities.Produto;

public interface ProdutoRepository extends JpaRepository<Produto,Long>{
	Produto findById(long id);
	Produto findByNome(String nome);
}
