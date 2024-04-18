To use this Turing machine Simulator, create a file named "transitions.csv" and format each transition in the following way:

```
<start state as integer>,<read char>,<write char>,<L for left or R for right>,<end state>
```

After that, in index.js, call the "calculate" function with an input string and an array of integers representing the accepting states. The function returns true on accepting and false on rejecting. 

NOTE: does not work if rejection is due to infinite loop. 