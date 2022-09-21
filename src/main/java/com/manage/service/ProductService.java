package com.manage.service;

import java.util.Map;

import org.springframework.boot.configurationprocessor.json.JSONException;

import com.manage.dto.ProductDto;

public interface ProductService {

	public Map<String, Object> createorupdateproduct(ProductDto productdto);
	
	public Map<String, Object> getAllProduct();
	
	public Map<String, Object> getProductById(Long id) ;
	
	public Map<String, Object> deleteProductById(Long id) ;
}
