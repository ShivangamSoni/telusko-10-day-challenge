import java.time.Year;
import java.util.ArrayList;
import java.util.List;

public class ProductService {
    private final List<Product> products = new ArrayList<>();

    public void addProduct(Product product) {
        products.add(product);
    }

    public List<Product> getAllProducts() {
        return products;
    }

    public Product getProduct(String name) {
        for(Product p : products) {
            if(p.getName().equalsIgnoreCase(name.toLowerCase())) {
                return p;
            }
        }
        return null;
    }

    public List<Product> getProductsWithText(String text) {
        String textLower = text.toLowerCase();
        List<Product> prods = new ArrayList<Product>();
        for(Product p : products) {
            String name = p.getName().toLowerCase();
            String type = p.getType().toLowerCase();
            String place = p.getPlace().toLowerCase();
            if(name.contains(textLower) || type.contains(textLower) || place.contains(textLower)) {
                prods.add(p);
            }
        }
        return prods;
    }

    public List<Product> getProductsByPlace(String place) {
        List<Product> prods = new ArrayList<Product>();
        for(Product p : products) {
            if(p.getPlace().equalsIgnoreCase(place.toLowerCase())) {
                prods.add(p);
            }
        }
        return prods;
    }

    public List<Product> getExpiredWarrantyProducts() {
        List<Product> prods = new ArrayList<Product>();
        int currentYear = Year.now().getValue();
        for(Product p : products) {
            if(p.getWarranty() < currentYear) {
                prods.add(p);
            }
        }
        return prods;
    }
}
