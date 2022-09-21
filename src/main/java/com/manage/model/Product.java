package com.manage.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "product")
public class Product {
	@Id
	@GeneratedValue
	private Long id;

	@Column(name = "product_name")
	private String productName;

	@Column(name = "price")
	private String price;

	@Column(name = "created_date")
	private String createdDate;

	@Column(name = "modified_date")
	private String modifiedDate;

	@ManyToOne
	@JoinColumn(name = "created_by")
	private Admin createdByAdminId;
	
	@ManyToOne
	@JoinColumn(name = "modified_by")
	private Admin modifiedByAdminId;
	
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

	public String getPrice() {
		return price;
	}

	public void setPrice(String price) {
		this.price = price;
	}

	public String getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(String createdDate) {
		this.createdDate = createdDate;
	}

	public String getModifiedDate() {
		return modifiedDate;
	}

	public void setModifiedDate(String modifiedDate) {
		this.modifiedDate = modifiedDate;
	}

	public Admin getCreatedByAdminId() {
		return createdByAdminId;
	}

	public void setCreatedByAdminId(Admin createdByAdminId) {
		this.createdByAdminId = createdByAdminId;
	}

	public Admin getModifiedByAdminId() {
		return modifiedByAdminId;
	}

	public void setModifiedByAdminId(Admin modifiedByAdminId) {
		this.modifiedByAdminId = modifiedByAdminId;
	}



	

	

}
