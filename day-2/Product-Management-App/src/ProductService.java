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
        return products.stream()
                .filter(p -> p.getName().equalsIgnoreCase(name.toLowerCase()))
                .findFirst()
                .orElse(null);
    }

    public List<Product> getProductsWithText(String text) {
        String textLower = text.toLowerCase();
        return products.stream()
                .filter(p -> p.getName().toLowerCase().contains(textLower) ||
                        p.getType().toLowerCase().contains(textLower) ||
                        p.getPlace().toLowerCase().contains(textLower))
                .toList();
    }

    public List<Product> getProductsByPlace(String place) {
        return products.stream()
                .filter(p -> p.getPlace().equalsIgnoreCase(place.toLowerCase()))
                .toList();
    }

    public List<Product> getExpiredWarrantyProducts() {
        int currentYear = Year.now().getValue();
        return products.stream()
                .filter(p -> p.getWarranty() < currentYear)
                .toList();
    }
}
