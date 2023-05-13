package com.sysCompras.SysCompras.dto;

public class CriarUsuario {
	private String nome;
	private String senha;
	private String codigoValidacao;
	public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}
	public String getSenha() {
		return senha;
	}
	public void setSenha(String senha) {
		this.senha = senha;
	}
	public String getCodigoValidacao() {
		return codigoValidacao;
	}
	public void setCodigoValidacao(String codigoValidacao) {
		this.codigoValidacao = codigoValidacao;
	}
	
}
