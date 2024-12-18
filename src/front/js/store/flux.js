

const getState = ({ getStore, getActions, setStore }) => {

    return {
        store: {
            assets: [],
            total_assets: 0,
            liabilities: [],
            total_liabilities: 0,
            currentUser: null, // Stores the current user's data
            currentUserPreferences: null, // Stores the current user's preferences
            quotes: null,
        },
        actions: {

            fetchAssets: async () => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}api/get-asset`, {
                        headers: {
                            Authorization: "Bearer " + sessionStorage.getItem("token")
                        },
                    });
                    if (response.ok) {
                        const data = await response.json();
                        console.log(data, "data")
                        setStore({
                            assets: data.asset_list,
                            total_assets: data.total,
                        });
                    } else {
                        console.error("Failed to fetch assets");
                    }
                } catch (error) {
                    console.error("Error fetching assets:", error);
                }
            },

            // QUOTE NINJAS API

            getQuotes: async () => {
                try {
                    const response = await fetch("https://api.api-ninjas.com/v1/quotes?category=money", {
                        method: "GET",
                        headers: {
                            'X-Api-Key': process.env.API_NINJAS_KEY,
                            "Content-Type": "application/json",
                        },


                    })
                    if (!response.ok) { throw new Error(`Error: ${response.statusText}`) }
                    const result = await response.json();
                    setStore({ quotes: result })
                    console.log("result from API Ninjas", result);
                } catch (error) {
                    console.error("error fetching quote", error.message)
                }
            },

            //             var category = 'happiness'
            //             $.ajax({
            //             method: 'GET',
            //             url: 'https://api.api-ninjas.com/v1/quotes?category=' + category,
            //             headers: { 'X-Api-Key': 'YOUR_API_KEY'},
            //             contentType: 'application/json',
            //             success: function(result) {
            //             console.log(result);
            //     },
            //             error: function ajaxError(jqXHR) {
            //             console.error('Error: ', jqXHR.responseText);
            //     }
            // });


            fetchLiabilities: async () => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}api/get-liabilities`, {
                        headers: {
                            Authorization: "Bearer " + sessionStorage.getItem("token")
                        },
                    });
                    if (response.ok) {
                        const data = await response.json();
                        console.log(data, "data")
                        setStore({
                            liabilities: data.liability_list,
                            total_liabilities: data.total,
                        });
                    } else {
                        console.error("Failed to fetch liabilities");
                    }
                } catch (error) {
                    console.error("Error fetching liabilities:", error);
                }
            },


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
                        console.log("loaded user info actions jsonified", data)
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
            fetchLiabilities: async () => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}api/get-liabilities`, {
                        headers: {
                            Authorization: "Bearer " + sessionStorage.getItem("token")
                        },
                    });
                    if (response.ok) {
                        const data = await response.json();
                        console.log(data, "data")
                        setStore({
                            liabilities: data.liability_list,
                            total_liabilities: data.total,
                        });
                    } else {
                        console.error("Failed to fetch liabilities");
                    }
                } catch (error) {
                    console.error("Error fetching liabilities:", error);
                }
            },

            addLiabilityToStore: (newLiability) => {
                const store = getStore();
                const updatedLiabilities = [...store.liabilities, newLiability];
                const updatedTotalLiabilities = store.total_liabilities + parseFloat(newLiability.amount);
                setStore({
                    liabilities: updatedLiabilities,
                    total_liabilities: updatedTotalLiabilities,
                });
            },
            addAssetToStore: (newAsset) => {
                const store = getStore();
                const updatedAssets = [...store.assets, newAsset];
                const updatedTotalAssets = store.total_assets + parseFloat(newAsset.amount);
                setStore({
                    assets: updatedAssets,
                    total_assets: updatedTotalAssets,
                });
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
                    // console.log("response from signup:", response);
                    const data = await response.json();
                    if (!response.ok) {
                        alert(data.message);
                        return false;
                    }
                    // console.log(data);
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
            updateLiability: async (liabilityId, updatedData) => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}api/update-liability/${liabilityId}`, {
                        method: "PUT",
                        headers: {
                            Authorization: "Bearer " + sessionStorage.getItem("token"),
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(updatedData),
                    });
            
                    if (response.ok) {
                        const updatedLiability = await response.json();
                        const store = getStore();
                        const liabilities = store.liabilities.map((liability) =>
                            liability.id === liabilityId ? updatedLiability : liability
                        );
                        setStore({ liabilities });
                    } else {
                        console.error("Failed to update liability");
                    }
                } catch (error) {
                    console.error("Error updating liability:", error);
                }
            },
            
            deleteLiability: async (liabilityId) => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}api/delete-liability/${liabilityId}`, {
                        method: "DELETE",
                        headers: {
                            Authorization: "Bearer " + sessionStorage.getItem("token"),
                        },
                    });
            
                    if (response.ok) {
                        const store = getStore();
                        const liabilities = store.liabilities.filter((liability) => liability.id !== liabilityId);
                        setStore({ liabilities });
                    } else {
                        console.error("Failed to delete liability");
                    }
                } catch (error) {
                    console.error("Error deleting liability:", error);
                }
            },
            
            updateAsset: async (assetId, updatedData) => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}api/update-asset/${assetId}`, {
                        method: "PUT",
                        headers: {
                            Authorization: "Bearer " + sessionStorage.getItem("token"),
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(updatedData),
                    });
            
                    if (response.ok) {
                        const updatedAsset = await response.json();
                        const store = getStore();
                        const assets = store.assets.map((asset) =>
                            asset.id === assetId ? updatedAsset : asset
                        );
                        setStore({ assets });
                    } else {
                        console.error("Failed to update asset");
                    }
                } catch (error) {
                    console.error("Error updating asset:", error);
                }
            },
            
            deleteAsset: async (assetId) => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}api/delete-asset/${assetId}`, {
                        method: "DELETE",
                        headers: {
                            Authorization: "Bearer " + sessionStorage.getItem("token"),
                        },
                    });
            
                    if (response.ok) {
                        const store = getStore();
                        const assets = store.assets.filter((asset) => asset.id !== assetId);
                        setStore({ assets });
                    } else {
                        console.error("Failed to delete asset");
                    }
                } catch (error) {
                    console.error("Error deleting asset:", error);
                }
            },
            
        }
    };
};

export default getState;
