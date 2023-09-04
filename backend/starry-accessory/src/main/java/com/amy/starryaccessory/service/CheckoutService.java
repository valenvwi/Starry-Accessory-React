import com.amy.starryaccessory.dto.Purchase;
import com.amy.starryaccessory.dto.PurchaseResponse;

public interface CheckoutService {
    PurchaseResponse placeOrder(Purchase purchase);
}
