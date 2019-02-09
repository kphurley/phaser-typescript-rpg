interface State {
  // Call this to enter the state, make any modifications here
  entry(): void;

  // Call this to exit the state, perform any cleanup here
  exit(): void;
}
