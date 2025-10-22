const Help = () => {
  return (
    <section className='col-span-4 my-5'>
        <h2 className="text-3xl text-white text-center mb-5">Help</h2>

        <p className="text-lg indent-8 mb-2">Welcome to our React-based e-commerce application! This guide will help you navigate and use our online store, which features product listings, categories, a shopping cart managed with Redux, and responsive design powered by Tailwind CSS.</p>

        <h3 className="text-xl text-white text-center mb-4">General Overview</h3>

        <p className="text-lg indent-8 mb-2">This is an e-commerce platform built with React, where you can browse products organized by categories, add items to your cart, and manage your purchases. The app uses Redux for state management (e.g., cart persistence) and Tailwind CSS for styling to ensure a smooth, mobile-friendly experience. If you're new, start by exploring the homepage or sidebar for categories.</p>
            
        <h3 className="text-xl text-white text-center mb-4">How to Use the Shopping Cart</h3>
        
        <ul className="list-[style-type:circle] ml-5">
            <li className="text-lg indent-8 mb-2"><b>Adding Items:</b> On any product page (e.g., SingleProduct component), select options like size from the dropdown, then click "Add to Cart". The item will be added to your Redux-managed cart.</li>
            <li className="text-lg indent-8 mb-2"><b>Viewing and Editing Cart:</b> Navigate to the Cart page via the header link. Here, you can increase/decrease quantities, remove items, or proceed to checkout.</li>
            <li className="text-lg indent-8 mb-2"><b>Checkout Process:</b> In the Cart, fill out the required fields (e.g., shipping info) and confirm your order. Cart data is stored in Redux for persistence across sessions.</li>
            <li className="text-lg indent-8 mb-2"><b>Tip:</b> If an item doesn't add, ensure you've selected all required options (e.g., size).</li>
        </ul>

        <h3 className="text-xl text-white text-center mb-4">Searching and Filtering Products</h3>

        <ul className="list-[style-type:circle] ml-5">
            <li className="text-lg indent-8 mb-2">Use the Sidebar component to filter products by category (e.g., electronics, clothing). Categories are dynamically loaded and displayed.</li>
            <li className="text-lg indent-8 mb-2">On the main products page, browse all items or use simple search (if implemented). Filters help narrow down results quickly.</li>
            <li className="text-lg indent-8 mb-2">Pro Tip: Categories are routed via React Router, so you can bookmark specific category pages (e.g., /category/electronics).</li>
        </ul>

        <h3 className="text-xl text-white text-center mb-4">Account and User Information</h3>

        <ul className="list-[style-type:circle] ml-5">
            <li className="text-lg indent-8 mb-2"><b>Creating an Account:</b> Use the UserForm component to register or log in. This allows saving your preferences and order history.</li>
            <li className="text-lg indent-8 mb-2"><b>Managing Profile:</b> After logging in, access your dashboard (if available) to view past orders or update details.</li>
            <li className="text-lg indent-8 mb-2"><b>Note:</b> Account data is handled securely; we recommend using a strong password.</li>
        </ul>  

        <h3 className="text-xl text-white text-center mb-4">Shipping and Payment</h3>

        <ul className="list-[style-type:circle] ml-5">
            <li className="text-lg indent-8 mb-2"><b>Shipping:</b> Orders are processed within 1-2 business days. We offer standard shipping (free over $50) and express options. Tracking info is sent via email.</li>
            <li className="text-lg indent-8 mb-2"><b>Payment:</b> Pay securely with credit card, PayPal, or other methods integrated into the checkout flow. All transactions are encrypted.</li>
            <li className="text-lg indent-8 mb-2"><b>Disclaimer:</b> This is a demo app; real payments may require additional setup (e.g., Stripe integration).</li>
        </ul>

        <h3 className="text-xl text-white text-center mb-4">Returns and Support</h3>

        <ul className="list-[style-type:circle] ml-5">
            <li className="text-lg indent-8 mb-2"><b>Return Policy:</b> Returns are accepted within 30 days of delivery for unused items. Contact us to initiate a return and receive a refund or exchange.</li>
            <li className="text-lg indent-8 mb-2"><b>Support:</b> For issues like order problems or app bugs, email support@yourstore.com or use the contact form below. Response time: 24-48 hours.</li>
            <li className="text-lg indent-8 mb-2">We aim to resolve queries via this Help section first to reduce wait times.</li>
        </ul>

        <h3 className="text-xl text-white text-center mb-4">Frequently Asked Questions (FAQ)</h3>

        <p className="text-lg indent-8 mb-2"><b>Q:</b> Why can't I add a product to my cart?</p>
        <p className="text-lg indent-8 mb-2"><b>A:</b> Ensure you've selected all required options (e.g., size or color) from the dropdown on the product page. If the issue persists, refresh the page or check your browser console for errors.</p>

        <p className="text-lg indent-8 mb-2"><b>Q:</b> How do I change the quantity in my cart?</p>
        <p className="text-lg indent-8 mb-2"><b>A:</b> On the Cart page, use the +/- buttons next to each item to adjust quantities. Changes are saved automatically via Redux.</p>

        <p className="text-lg indent-8 mb-2"><b>Q:</b> The page isn't loading properly. What should I do?</p>
        <p className="text-lg indent-8 mb-2"><b>A:</b> Try refreshing the page, clearing your browser cache, or checking your internet connection. If it's a routing issue (e.g., 404 error), ensure you're using valid URLs like /products or /cart. For persistent problems, contact support.</p>

        <p className="text-lg indent-8 mb-2"><b>Q:</b> Can I save my cart for later?</p>
        <p className="text-lg indent-8 mb-2"><b>A:</b> Yes, thanks to Redux, your cart persists across sessions if you're logged in. Log out and back in to retrieve it.</p>

        <p className="text-lg indent-8 mb-2"><b>Q:</b> How do categories work?</p>
        <p className="text-lg indent-8 mb-2"><b>A:</b> Categories are displayed in the Sidebar. Clicking one filters products on the main page. They're managed via routes (e.g., /category/clothing).</p>

        <h3 className="text-xl text-white text-center mb-4">Contact Us</h3>

        <ul className="list-[style-type:circle] ml-5">
            <li className="text-lg indent-8 mb-2"><b>Email:</b> help@yourstore.com</li>
            <li className="text-lg indent-8 mb-2"><b>Phone:</b> +1 (123) 456-7890 (Mon-Fri, 9 AM - 5 PM EST)</li>
            <li className="text-lg indent-8 mb-2"><b>Social Media:</b> Follow us on Twitter (@YourStoreApp) for updates.</li>
            <li className="text-lg indent-8 mb-2"><b>Feedback:</b> We appreciate your input! Use the form below or email us directly.</li>
            <li className="text-lg indent-8 mb-2">If this Help section doesn't answer your question, feel free to reach out. Happy shopping!</li>
        </ul>

    </section>
  )
}

export default Help