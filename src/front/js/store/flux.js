const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            currentUser: null, // Stores the current user's data
            currentUserPreferences: null, // Stores the current user's preferences
        },
        actions: {

			editUserInfo: async (updatedUser) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/edit-user-info", {
						method: "PUT",
						headers: {
							Authorization: "Bearer " + sessionStorage.getItem("token"),
							"Content-Type": "application/json"
						},
						body: JSON.stringify({
							username: updatedUser.username,
							phone: updatedUser.phone,
							text_notification: updatedUser.text_notification,
							text_frequency: updatedUser.text_frequency
						})
					});
			
					if (response.ok) {
						const data = await response.json();
						setStore({
							currentUser: data.user,
							currentUserPreferences: data.preferences
						});
						return true;
					} else {
						const data = await response.json();
						alert(data.message);
						return false;
					}
				} catch (error) {
					console.error("Error updating user info:", error);
					alert("Something went wrong, try again later.");
					return false;
				}
			},
			


			changePassword: async (passwordDetails) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/change-password", {
						method: "PUT",
						headers: {
							Authorization: "Bearer " + sessionStorage.getItem("token"),
							"Content-Type": "application/json"
						},
						body: JSON.stringify({
							current_password: passwordDetails.currentPassword,
							new_password: passwordDetails.newPassword
						})
					});
			
					const data = await response.json();
					if (!response.ok) {
						alert(data.message);
						return false;
					}
			
					return true;
				} catch (error) {
					console.error("Error changing password", error);
					alert("Something went wrong, try again later.");
					return false;
				}
			},
			
            // Fetch the current user and preferences
            loadUserInfo: async () => {
                try {
                    const response = await fetch(process.env.BACKEND_URL + "/api/user-info", {
                        method: "GET",
                        headers: {
                            Authorization: "Bearer " + sessionStorage.getItem("token"),
                            "Content-Type": "application/json"
                        }
                    });

                    if (response.ok) {
                        const data = await response.json();
                        setStore({
                            currentUser: data.user,
                            currentUserPreferences: data.preferences
                        });
                    } else {
                        console.log("Error loading user info");
                    }
                } catch (error) {
                    console.error("Error loading user info:", error);
                }
            },

            // Forgot password action
            forgotPassword: async (email) => {
                try {
                    const response = await fetch(process.env.BACKEND_URL + "/api/forgot-password", {
                        method: "POST",
                        body: JSON.stringify({ email: email.toLowerCase() }),
                        headers: { "Content-Type": "application/json" }
                    });

                    const data = await response.json();
                    if (!response.ok) {
                        alert(data.message);
                        return false;
                    }
                    return true;
                } catch (error) {
                    console.error("Error during forgot password", error);
                    alert("Something went wrong, try again later");
                    return false;
                }
            },

            // Reset password action
            resetPassword: async (token, newPassword) => {
                try {
                    const response = await fetch(process.env.BACKEND_URL + "/api/reset-password/" + token, {
                        method: "PUT",
                        body: JSON.stringify({ password: newPassword }),
                        headers: { "Content-Type": "application/json" }
                    });

                    const data = await response.json();
                    if (!response.ok) {
                        alert(data.message);
                        return false;
                    }
                    return true;
                } catch (error) {
                    console.error("Error during password reset", error);
                    alert("Something went wrong, try again later");
                    return false;
                }
            },

            signUp: async (newUser) => {
                try {
                    const response = await fetch(process.env.BACKEND_URL + "/api/signup", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            email: newUser.email.toLowerCase(),
                            password: newUser.password,
                            username: newUser.username,
                            phone: newUser.phone,
                            text_notification: newUser.text_notification,
                            text_frequency: newUser.text_frequency
                        }),
                    });
                    console.log("response from signup:", response);
                    const data = await response.json();
                    if (!response.ok) {
                        alert(data.message);
                        return false;
                    }
                    console.log(data);
                    return true;
                } catch (error) {
                    console.error("Error during signup", error);
                    alert("Something went wrong, try again later");
                    return false;
                }
            },

            login: async (email, password) => {
                try {
                    const response = await fetch(process.env.BACKEND_URL + "/api/login", {
                        method: "POST",
                        body: JSON.stringify({
                            email: email.toLowerCase(),
                            password: password
                        }),
                        headers: { "Content-Type": "application/json" }
                    });
                    const data = await response.json();
                    if (response.status !== 200) {
                        alert(data.message);
                        return false;
                    }

                    sessionStorage.setItem("token", data.token);

                    // Call loadUserInfo after successful login
                    getActions().loadUserInfo();

                    return true;
                } catch (error) {
                    console.error("please try again later", error);
                    throw error;
                }
            },
        }
    };
};

export default getState;
