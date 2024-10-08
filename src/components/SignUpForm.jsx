import { useState } from "react";

export default function SignUpForm({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await fetch("https://fsa-jwt-practice.herokuapp.com/signup", {
        method: "POST", 
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify({ username, password }), 
      });

      if (!response.ok) {
        throw new Error("Signup failed, please try again.");
      }

      const result = await response.json(); 
      console.log(result); 

      if (result.token) {
        localStorage.setItem("authToken", result.token); 
        setToken(result.token);
      }
      
      setError(null); 
      setUsername("");
      setPassword("");
    } catch (error) {
      setError(error.message); 
    }
  }

  return (
    <>
      <h2>Sign Up</h2>
      {error && <p style={{ color: "red" }}>{error}</p>} 
      
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
        </label>
        
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
        </label>
        
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
