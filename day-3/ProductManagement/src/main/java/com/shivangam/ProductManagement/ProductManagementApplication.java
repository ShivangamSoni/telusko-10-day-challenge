package com.shivangam.ProductManagement;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

import java.util.List;

@SpringBootApplication
public class ProductManagementApplication {

	public static void main(String[] args) {
		ApplicationContext context = SpringApplication.run(ProductManagementApplication.class, args);

		ProductService service = context.getBean(ProductService.class);

        // Add Products
		/*
		service.addProduct(new Product("Type C", "Cable", "Black Drawer", 2024));
		service.addProduct(new Product("Mac Studio", "Computer", "White Table", 2025));
		service.addProduct(new Product("Focusrite Mixer", "Audio System", "White Table", 2025));
		service.addProduct(new Product("Asus Vivobook", "Laptop", "Brown Drawer", 2021));
		service.addProduct(new Product("Asus Rog", "Laptop", "Black Table", 2021));
		service.addProduct(new Product("Macbook pro", "Laptop", "Brown Drawer", 2022));
		service.addProduct(new Product("Wacom Pad", "Writing Pad", "Black Drawer", 2020));
		service.addProduct(new Product("Apple Keyboard", "Keyboard", "White Table", 2022));
		service.addProduct(new Product("Logitech Keyboard", "Keyboard", "Black Table", 2024));
		service.addProduct(new Product("Hdmi cable", "Cable", "Black Drawer", 2024));
		service.addProduct(new Product("Java Black Book", "Cable", "Shelf", 2024));
		service.addProduct(new Product("Logi Mouse", "Mouse", "Black Table", 2022));
		service.addProduct(new Product("Apple Mouse", "Mouse", "White Table", 2022));
		service.addProduct(new Product("Lenovo Mouse", "Mouse", "Black Drawer", 2022));
		service.addProduct(new Product("BlackBeast", "Computer", "White Table", 2020));
		service.addProduct(new Product("BlackBeast", "Computer", "White Table", 2020));
		 */

		System.out.println("All Products");
		List<Product> products = service.getAllProducts();
		products.forEach(System.out::println);
		System.out.println("-----------------------------------------------");

		System.out.println("Get a Particular Product by Name");
		Product prod = service.getProduct("type c");
		System.out.println(prod);
		System.out.println("=======================================");

		System.out.println("Get all Products based on Text");
		products = service.getProductsWithText("Black");
		products.forEach(System.out::println);
		System.out.println("=======================================");

		System.out.println("Get all Products by Place");
		products = service.getProductsByPlace("white Table");
		products.forEach(System.out::println);
		System.out.println("=======================================");

		System.out.println("Get all Products whose Warranty is Expired");
		products = service.getExpiredWarrantyProducts();
		products.forEach(System.out::println);
		System.out.println("=======================================");
	}

}
