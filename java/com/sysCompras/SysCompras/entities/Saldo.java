package com.sysCompras.SysCompras.entities;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="tb_saldos")
public class Saldo {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;
	private double valor;
	private String dataDaCompra;
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public double getValor() {
		return valor;
	}
	public void setValor(double valor) {
		this.valor = valor;
	}
	public String getDataDaCompra() {
		return dataDaCompra;
	}
	public void setDataDaCompra(String dataDaCompra) {
		this.dataDaCompra = dataDaCompra;
	}

}
