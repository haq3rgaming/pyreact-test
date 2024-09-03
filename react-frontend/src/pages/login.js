function Login() {
    return (
        <div>
            <h1>Login</h1>
            <br />
            <input type="text" placeholder="Username" id="username" />
            <input type="text" placeholder="Password" id="password" />
            <button onClick={async () => {
                const username = document.getElementById('username').value;
                const password = document.getElementById('password').value;

                fetch('/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username: username,
                        password: password
                    })
                }).then(response => {
                    if (response.status === 200) {
                        window.location.href = '/';
                    } else {
                        alert('Wrong credentials');
                    }
                });
            }}>Login</button>
        </div>
    );
}

export default Login;