const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			assets: [],
			total_assets: 0,
			liabilities: [],
			total_liabilities: 0,
		},
		actions: {

			// forgot password action


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
		


			// reset password action

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
					})
					console.log("response from signup:", response)
					const data = await response.json();
					if (!response.ok) {
						alert(data.message);
						return false
					};
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
					})
					const data = await response.json();
					if (response.status !== 200) {
						alert(data.message);
						return false
					};

					sessionStorage.setItem("token", data.token);
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
