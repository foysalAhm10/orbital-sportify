import { Keyboard } from "react-native";

const toggleSinglePicker = (setThis: Function, others: Function[]) => {
  others.forEach(set => set(false));    
  Keyboard.dismiss();                   
  setThis((prev: boolean) => !prev);     
};

export default toggleSinglePicker;