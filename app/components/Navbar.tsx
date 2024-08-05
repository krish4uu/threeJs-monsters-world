"use client";

export default function Navbar({
  setButtonStateTitan,
  setTitanName,
  titanName,
}: any) {
  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.table(`titanName: ${titanName}`);
    setButtonStateTitan(titanName);
  };
  return (
    <>
      <nav className="flex flex-1 p-4 m-2 justify-between items-center md:text-2xl text-l">
        <h2 className="flex items-center">Monsters World</h2>
        <div id="titan-container" className="flex md:gap-4 gap-2 text-wrap">
          <label
            id="select-titan"
            className="flex flex-col md:text-2xl text-sm md:gap-2"
          >
            <span>Select titan:</span>
            <select
              id="titan"
              name="titan"
              value={titanName}
              onChange={(e) => setTitanName(e.target.value)}
              className="text-black md:text-2l text-sm bg-white rounded-l shadow-lg flex items-center"
            >
              <option value="Godzilla">Godzilla</option>
              <option value="Kong">Kong</option>
            </select>
          </label>
          <button
            type="submit"
            className="rounded-l bg-green"
            onClick={handleSubmit}
          >
            {" "}
            Submit
          </button>
        </div>
      </nav>
    </>
  );
}
