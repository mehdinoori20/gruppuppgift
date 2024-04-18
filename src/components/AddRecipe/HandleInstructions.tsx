// Alexander

import React, { useState } from "react";

interface InstructionListProps {
  instructions: string[];
  setInstructions: React.Dispatch<React.SetStateAction<string[]>>;
}

function InstructionList({
  instructions,
  setInstructions,
}: InstructionListProps): JSX.Element {
  const [newInstruction, setNewInstruction] = useState("");

  const handleAddInstructions = () => {
    if (newInstruction.trim() !== "") {
      setInstructions([...instructions, newInstruction]);
      setNewInstruction("");
    }
    // alert("Instructions can't be empty")
  };

  const handleRemoveInstruction = (index: number) => {
    setInstructions(instructions.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div className="flex justify-center items-stretch">
        <div className="w-full">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-5/6 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="instruction"
              >
                Instruction
              </label>
              <input
                type="text"
                value={newInstruction}
                onChange={(e) => setNewInstruction(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleAddInstructions();
                  }
                }}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="instruction"
                placeholder="Instruction"
               
              />
            </div>
            <div className="w-full md:w-1/6 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="button"
              >
                <br />
              </label>
              <button
                onClick={handleAddInstructions}
                id="button"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 border border-blue-700 rounded"
              >
                ADD
              </button>

              {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
            </div>
          </div>
          {instructions.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="border px-1 py-1 bg-slate-400 text-white">
                      INSTRUCTIONS
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {instructions.map((instruction, index) => (
                    <tr key={index}>
                      <td className="border px-0.5 py-0.5 flex justify-between items-center">
                        <div className="flex items-center">
                          <span>
                            {index + 1}. {instruction}
                          </span>
                        </div>
                        <div>
                          <button
                            onClick={() => handleRemoveInstruction(index)}
                            className="bg-red-400 hover:bg-red-500 text-white font-bold py-1 px-2 border border-red-500 rounded text-sm"
                          >
                            REMOVE
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default InstructionList;
