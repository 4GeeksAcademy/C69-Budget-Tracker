const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {

		},
		actions: {



			// forgot password action



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
