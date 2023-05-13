package com.sysCompras.SysCompras.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sysCompras.SysCompras.entities.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario,Long>{
	Usuario findById(long id);
	Usuario findByNome(String nome);
}
