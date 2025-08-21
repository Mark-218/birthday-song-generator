import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div
      className="w-full flex flex-col justify-between items-center text-center text-white"
      style={{
        backgroundImage: "url('/assets/images/bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "calc(100vh - 64px)", // subtract header height (64px = h-16)
      }}
    >
      {/* Center Section: Image + Titles */}
      <div className="flex flex-col items-center justify-center flex-grow px-4">
        <img
          src="/assets/images/celebrations-box.png"
          alt="Celebrations"
          className="w-72 md:w-96 drop-shadow-lg mb-6"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />

        <p className="text-lg font-dairymilk md:text-xl mb-2">
          A unique birthday song for everyone!
        </p>
        <p className="text-sm font-gibson italic opacity-80">
          इस birthday, कुछ अच्छा हो जाए कुछ मीठा हो जाए
        </p>
      </div>

      {/* Bottom Section: Button */}
    <div className="mb-12">
  <Link
    to="/register"
    className=" bg-yellow-400 text-purple-900 font-semibold py-3 px-8 hover:bg-yellow-300 transition rounded-xl"
  >
    Continue
  </Link>
</div>

    </div>
  );
}
