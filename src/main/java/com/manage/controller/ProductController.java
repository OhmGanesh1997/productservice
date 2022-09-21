package com.manage.controller;

import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.manage.dto.ProductDto;
import com.manage.dto.ResponseDto;
import com.manage.service.ProductService;
import com.manage.serviceImpl.ProductServiceImpl;

@Controller
@RequestMapping(value = "/product")
public class ProductController {
	
	private static final org.slf4j.Logger log = LoggerFactory.getLogger(ProductController.class);

	@Autowired
	ProductService productService;

	@PostMapping(value = { "/createorupdateproduct" })
	@ResponseBody
	public ResponseEntity<Object> createOrUpdateProduct(@RequestBody ProductDto product) {
		
		log.info("API -> getAllProducts, params - "+product.toString());

		ResponseDto responseDto = new ResponseDto();

		try {
			return new ResponseEntity<>(productService.createorupdateproduct(product), HttpStatus.OK);
		} catch (Exception e) {
			responseDto.setStatus(false);
			responseDto.setMessage(e.getMessage());
			return new ResponseEntity<>(responseDto, HttpStatus.BAD_REQUEST);
		}

	}

	@GetMapping(value = { "/getproductbyid" })
	@ResponseBody
	public ResponseEntity<Object> getProductById(@RequestParam Long id) {
		return new ResponseEntity<>(productService.getProductById(id), HttpStatus.OK);
	}

	@GetMapping(value = { "/getallproduct" })
	@ResponseBody
	public ResponseEntity<Object> getAllProduct() throws JSONException {
		return new ResponseEntity<Object>(productService.getAllProduct(), HttpStatus.OK);
	}

	@PostMapping(value = { "/deleteproductbyid" })
	@ResponseBody
	public ResponseEntity<Object> deleteProductById(@RequestParam Long id) {
		return new ResponseEntity<>(productService.deleteProductById(id), HttpStatus.OK);
	}
}
