export const filterProducts = (products, filtered_list, check_id, check_index) => {
    let filtered_products = [];
    if (filtered_list && filtered_list.length > 0) {
        filtered_products = products.filter((product) => {
            let filtered_check = filtered_list.find(filtered_item => (filtered_item.product_id == product._id && filtered_item[check_index] == check_id));
            if (filtered_check) {
                return product;
            } else {
                return;
            }
        });      
    }

    return filtered_products;
}

export const filterOutProducts = (products, filtered_list, check_id, check_index) => {
    let filtered_products = [];
    if (filtered_list && filtered_list.length > 0) {
        filtered_products = products.filter((product) => {
            let filtered_check = filtered_list.find(filtered_item => (filtered_item.product_id == product._id && filtered_item[check_index] != check_id));
            if (!filtered_check) {
                return product;
            } else {
                return;
            }
        });      
    }

    return filtered_products;
}

export const isEnrolled = (products, enrollments, user_id, product_id) => {
    let filtered_products = filterOutProducts(products, enrollments, user_id, "user_id");
    let filtered_check = false;
    if (filtered_products && filtered_products.length > 0) {
            filtered_check = filtered_products.find(filtered_item => (filtered_item.product_id == product_id));           
    }

    return filtered_check;
}

export const findProduct = (products, product_id) => {
    let found_product = null;
    if (products && products.length > 0) {
        products.forEach((product) => {
            if(product._id == product_id) {
                found_product = product;
            }
        });      
    }

    return found_product;
}



