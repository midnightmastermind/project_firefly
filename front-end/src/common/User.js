export const filterUsers = (users, filtered_list) => {
    let filtered_users = [];
    if (filtered_list && filtered_list.length > 0) {
        filtered_users = users.filter((user) => {
            let filtered_check = filtered_list.find(filtered_item => (filtered_item.user_id == user._id));
            if (filtered_check) {
                return user;
            } else {
                return;
            }
        });
    }
    
    return filtered_users;
}


export const filterOutUsers = (users, filtered_list) => {
    let filtered_users = [];
    if (filtered_list && filtered_list.length > 0) {
        filtered_users = users.filter((user) => {
            let filtered_check = filtered_list.find(filtered_item => (filtered_item.user_id == user._id));
            if (!filtered_check) {
                return user;
            } else {
                return;
            }
        });
    }
    
    return filtered_users;
}

export const filterStudents = (users, enrollments, product_permissions, current_user) => {
    let filtered_users = [];
    filtered_users = users.filter((user) => {
            if(enrollments && product_permissions) {

                let student_enrollments = []
                product_permissions.forEach(product_permission => {
                    enrollments.forEach(enrollment => {
                        if(enrollment.product_id == product_permission.product_id && product_permission.user_id == current_user.id) {
                            student_enrollments.push(enrollment);
                        }
                    });
                });
            
                let filtered_check = student_enrollments.find(filtered_item => (filtered_item.user_id == user._id));
                if (filtered_check) {
                    return user;
                } else {
                    return;
                }
            } else {
                return;
            }
    });
    return filtered_users;
}

export const filterUsersBySite = (users, filtered_list, site_id) => {
    let filtered_users = [];
    if (filtered_list && filtered_list.length > 0) {
        filtered_users = users.filter((user) => {
            let filtered_check = filtered_list.find(filtered_item => (filtered_item.user_id == user._id) && filtered_item.site_id == site_id);
            if (filtered_check) {
                return user;
            } else {
                return;
            }
        });
    }
    
    return filtered_users;
}

