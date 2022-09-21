package com.manage.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.manage.model.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
	
	@Query(value = "SELECT * FROM product p WHERE p.product_name=:productName",nativeQuery=true)
	List<Object[]> findProductByName(@Param("productName")String productName);

	@Query(value = "SELECT p.id,p.product_name,p.price,a.admin_name as created_by,from_unixtime( UNIX_TIMESTAMP(p.created_date)),b.admin_name as  modified_by,from_unixtime( UNIX_TIMESTAMP(p.modified_date)) FROM product p LEFT JOIN admin a ON a.id=p.created_by LEFT JOIN admin b ON b.id=p.modified_by ",nativeQuery=true)
	List<Object[]> findAllProduct();
	
	@Query(value = "SELECT p.id,p.product_name,p.price,a.admin_name as created_by,p.created_date,b.admin_name as  modified_by,p.modified_date FROM product p LEFT JOIN admin a ON a.id=p.created_by LEFT JOIN admin b ON b.id=p.modified_by  where p.id=:id",nativeQuery=true)
	List<Object[]> findAllProductById(@Param("id")Long id);
}

