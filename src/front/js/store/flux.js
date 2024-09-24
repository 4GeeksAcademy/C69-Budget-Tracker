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
						body: JSON.stringify({
							email: newUser.email,
							password: newUser.password
						}),
						headers: { "Content-Type": "application/json" }
					})
					const data = await response.json();
					if (response.status !== 201) {
						alert(data.message);
						return false
					};
					console.log(data);
					return true;
				} catch (error) {
					console.error("please try again later", error);
					throw error
				}

			},

			

			login: async (email, password) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/login", {
						method: "POST",
						body: JSON.stringify({email, password}),
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
