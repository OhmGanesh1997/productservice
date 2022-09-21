package com.manage.serviceImpl;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Optional;
import java.util.TimeZone;

import javax.annotation.Resource;

import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.manage.dto.ProductDto;
import com.manage.dto.StatusDto;
import com.manage.model.Admin;
import com.manage.model.Product;
import com.manage.repository.AdminRepository;
import com.manage.repository.ProductRepository;
import com.manage.service.ProductService;

@Service
public class ProductServiceImpl implements ProductService {
	
	private static final org.slf4j.Logger log = LoggerFactory.getLogger(ProductServiceImpl.class);

	@Resource
	ProductRepository productRepository;

	@Resource
	AdminRepository adminRepository;

	@Override
	public Map<String, Object> createorupdateproduct(ProductDto productdto) {
		Map<String, Object> entity = new HashMap<>();
		
		log.info("API -> getAllProducts, params - "+productdto.toString());
		
		try {

		if (productdto.getId() != 0) {

			Optional<Product> products = productRepository.findById(productdto.getId());
			Optional<Admin> admins = adminRepository.findById(productdto.getAdminId());

			if (products.isPresent()) {
				products.ifPresent(data -> {
					Date myDateObj1 = new Date();
					SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss", Locale.ENGLISH);
					sdf.setTimeZone(TimeZone.getTimeZone("Asia/Kolkata"));
					String strDate = sdf.format(myDateObj1);

					data.setProductName(productdto.getProductName());
					data.setPrice(productdto.getPrice());
					data.setModifiedDate(strDate);
					admins.ifPresent(r -> {
						data.setModifiedByAdminId(r);
					});
					productRepository.save(data);
				});
				entity.put("status:", "200");
				entity.put("message:", "Updated SuccessFully");

				return entity;
			} else {
				entity.put("status:", "400");
				entity.put("message:", "No Data Found");
				return entity;
			}
		} else {

			List<Object[]> products = productRepository.findProductByName(productdto.getProductName());
			Optional<Admin> admins = adminRepository.findById(productdto.getAdminId());
			if (products.size() > 0) {
				entity.put("status:", "400");
				entity.put("message:", "Product Already Added !");
				return entity;
			} else {
				Product product = new Product();
				Date myDateObj1 = new Date();
				SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss", Locale.ENGLISH);
				sdf.setTimeZone(TimeZone.getTimeZone("Asia/Kolkata"));
				String strDate = sdf.format(myDateObj1);
				product.setPrice(productdto.getPrice());
				product.setProductName(productdto.getProductName());
				product.setCreatedDate(strDate);
				product.setModifiedDate(strDate);
				admins.ifPresent(r -> {
					product.setModifiedByAdminId(r);
					product.setCreatedByAdminId(r);
				});

				productRepository.save(product);
				entity.put("status:", "200");
				entity.put("message:", "Created Successfully");
				return entity;
			}
		}
		
		} catch (Exception e) {
			log.error("getAllProducts(API) -> error info *** " + e);
			
			entity.put("status:", false);
			entity.put("message:", "Exception occured,Please try again later");
			

			e.printStackTrace();
			
			
		}
		
		return entity;
	}

	public Map<String, Object> getAllProduct() {
		Map<String, Object> entity = new HashMap<>();
		List<Object[]> products = productRepository.findAllProduct();
		List<StatusDto> statusDtos = new ArrayList<StatusDto>();

		if (products.size() > 0) {
			for (Object[] product : products) {
				StatusDto statusDto = new StatusDto();

				statusDto.setProduct_id(Long.parseLong(product[0].toString()));
				statusDto.setProductName(product[1].toString());
				statusDto.setPrice(product[2].toString());
				statusDto.setCreatedBy(product[3].toString());
				statusDto.setCreatedDate(product[4].toString());
				statusDto.setModifiedBy(product[5].toString());
				statusDto.setModifiedDate(product[6].toString());
				statusDtos.add(statusDto);
			}
			entity.put("status:", "200");
			entity.put("message:", "Data Found");
			entity.put("data:", statusDtos);

		} else {
			entity.put("status:", "200");
			entity.put("message:", "No Data In There");
		}
		return entity;
	}

	public Map<String, Object> getProductById(Long id) {
		Map<String, Object> entity = new HashMap<>();
		List<Object[]> products = productRepository.findAllProductById(id);
		if (products.size() > 0) {

			StatusDto statusDto = new StatusDto();
			for (Object[] product : products) {
				statusDto.setProduct_id(Long.parseLong(product[0].toString()));
				statusDto.setProductName(product[1].toString());
				statusDto.setPrice(product[2].toString());
				statusDto.setCreatedBy(product[3].toString());
				statusDto.setCreatedDate(product[4].toString());
				statusDto.setModifiedBy(product[5].toString());
				statusDto.setModifiedDate(product[6].toString());
			}
			entity.put("status:", "200");
			entity.put("message:", "Data Found");
			entity.put("data:", statusDto);
		} else {
			entity.put("status:", "400");
			entity.put("message:", "No Data Found");
		}

		return entity;

	}

	public Map<String, Object> deleteProductById(Long id) {
		Map<String, Object> entity = new HashMap<>();
		Optional<Product> products = productRepository.findById(id);
		if (products.isPresent()) {
			productRepository.deleteById(id);
			entity.put("status:", "200");
			entity.put("message:", "Delete Successfully");
		} else {
			entity.put("status:", "400");
			entity.put("message:", "No Data Found");
		}
		return entity;
	}

}
