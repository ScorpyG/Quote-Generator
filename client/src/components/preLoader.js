import Lottie from "react-lottie";

// Import loading animation
import * as location from "../loadingAnimation.json";

// Loading animation settting
const animationSettings = {
  loop: true,
  autoplay: true,
  animationData: location.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const [loading, setloading] = useState(undefined);
const [completed, setcompleted] = useState(undefined);