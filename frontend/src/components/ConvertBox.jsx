import { formats } from './utils/helpers';

export default function ConvertBox({ data, chooseFormat }) {
  return (
    <div
      style={{
        transition: "all .2s ease-in-out",
        backgroundColor: "#000", // default light mode color
        margin: "20px",
        padding: "10px",
        borderRadius: "8px",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#000")}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src={data?.thumbnails[2]?.url}
          alt={`Thumbnail`}
          style={{ borderRadius: "4px", marginRight: "10px", width: "100px" }}
        />
        <div style={{ paddingLeft: "8px" }}>
          <h3 style={{ fontSize: "1.25rem", margin: 0, color: "#fff" }}>{data?.title}</h3>
          <p style={{ marginBottom: "20px", color: "#fff" }}>
            {data?.author?.name || data?.author?.user}
          </p>
          <div style={{ position: "relative", display: "inline-block" }}>
            <button
              style={{
                padding: "8px 12px",
                display: "flex",
                alignItems: "center",
                backgroundColor: "#2b6cb0",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
              onClick={() => {
                const menu = document.getElementById("dropdown-menu");
                menu.style.display =
                  menu.style.display === "block" ? "none" : "block";
              }}
            >
              Download ▼
            </button>
            <div
              id="dropdown-menu"
              style={{
                display: "none",
                position: "absolute",
                top: "100%",
                left: 0,
                backgroundColor: "#fff",
                color: "#fff",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                borderRadius: "4px",
                overflow: "hidden",
                zIndex: 1,
              }}
            >
              {formats.map((format) => (
                <button
                  key={format.text}
                  className="button-style py-[15px] px-[10px] w-[100%] text-left bg-none cursor-pointer hover:bg-slate-600 bg-slate-500"
                  onClick={() => chooseFormat(format.format, data.videoId)}
                >
                  {format.text}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
