import React from 'react';

const Form = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
    <div>
    <label>Name: </label>
      <input
        type="text"
        name="name"
        value={props.name}
        onChange={props.handleChange}
        placeholder="John Doe"
      />
      <label>Email: </label>
      <input
        type="text"
        name="email"
        value={props.email}
        onChange={props.handleChange}
        placeholder="JohnDoe@gmail.com"
      />
      <label>Password: </label>
      <input
        type="text"
        name="password"
        value={props.password}
        onChange={props.handleChange}
        placeholder="*********"
      />
      <span>
        <button type="submit">Submit</button>
      </span>
    </div>
  </form>
  );
};

export default Form;
