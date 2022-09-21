package com.manage.dto;

public class ProductDto {

	private Long id;

	private String productName;

	private String price;
	
	private Long adminId;

	@Override
	public String toString() {
		return "ProductDto [id=" + id + ", productName=" + productName + ", price=" + price + ", adminId=" + adminId
				+ "]";
	}

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

	public Long getAdminId() {
		return adminId;
	}

	public void setAdminId(Long adminId) {
		this.adminId = adminId;
	}

	
}
