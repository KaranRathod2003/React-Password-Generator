import { useCallback, useState, useEffect, useRef } from 'react'; // React hooks for state and side effects
import './App.css'; // Importing CSS styles

function App() {
  // State variables to manage password generation and options
  const [password, setPassword] = useState(""); // State variable to store generated password
  const [length, setLength] = useState(8); // State variable to store password length
  const [numbersAllowed, setNumbersAllowed] = useState(false); // State variable to manage if numbers are allowed
  const [charactersAllowed, setCharactersAllowed] = useState(false); // State variable to manage if special characters are allowed

  // useCallback hook to memoize password generation function
  const generatePassword = useCallback(() => {
    let generatedPassword = ""; // Initialize an empty string to store the generated password
    let charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"; // Default character set for password generation

    // If numbers are allowed, add numbers to the character set
    if (numbersAllowed) charset += "0123456789";
    // If special characters are allowed, add them to the character set
    if (charactersAllowed) charset += "!@#$%^&*-_+=[]{}~`";

    // Generate password characters based on the selected length
    for (let i = 1; i <= length; i++) {
      let charIndex = Math.floor(Math.random() * charset.length); // Generate a random index within the character set length
      generatedPassword += charset.charAt(charIndex); // Append a character from the character set to the generated password
    }

    // Update the password state variable with the generated password
    setPassword(generatedPassword);
  }, [length, numbersAllowed, charactersAllowed]); // Dependencies for the useCallback hook

  const passwordRef = useRef(null); // Create a reference to the password input field

  // Function to copy the generated password to the clipboard
  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select(); // Select the text in the password input field
    passwordRef.current?.setSelectionRange(0, 101); // Set the selection range for the text
    window.navigator.clipboard.writeText(password); // Write the selected text to the clipboard
  }, [password]); // Dependency for the useCallback hook

  // useEffect hook to generate a password whenever relevant state variables change
  useEffect(() => {
    generatePassword(); // Generate a password when any of the dependencies change
  }, [length, numbersAllowed, charactersAllowed, generatePassword]); // Dependencies for the useEffect hook

  // JSX code for the component's UI
  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
      <h1 className='text-white text-center my-3'>Password Generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={password} // Display the generated password
          className="outline-none w-full py-1 px-3"
          placeholder="Password"
          readOnly
          ref={passwordRef} // Set the reference to the password input field
        />
        <button
          className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
          onClick={copyPasswordToClipboard} // Handle click event to copy password to clipboard
        >
          Copy
        </button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input
            type="range"
            min={8}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e) => { setLength(e.target.value) }} // Update the password length based on user input
          />
          <label>Length: {length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            id='numberinput'
            defaultChecked={numbersAllowed}
            onChange={() => {
              setNumbersAllowed((prev) => !prev); // Toggle the state of numbersAllowed
            }}
          />
          <label htmlFor="numberinput">Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            id='characterinput'
            defaultChecked={charactersAllowed}
            onChange={() => {
              setCharactersAllowed((prev) => !prev); // Toggle the state of charactersAllowed
            }}
          />
          <label htmlFor="characterinput">Characters</label>
        </div>
      </div>
    </div>
  );
}

export default App;
