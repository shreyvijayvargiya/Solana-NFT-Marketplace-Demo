import React from 'react';
import { TextField, IconButton } from "@material-ui/core";
import { AiOutlineSearch } from 'react-icons/ai';

const Header = ({ submitInputValue , handleAddressChange, address }) => {
  return (
    <div className="flex flex-wrap justify-between w-full mx-auto gap-4 items-center p-6 bg-gray-100 fixed top-0 left-0 right-0 z-10">
      <div style={{ flex: 1 }}>
        <p className="text-3xl ">NFT Viewer</p>
      </div>
      <div style={{ flex: 1 }}>
        <TextField
          name="address"
          placeholder="Enter the address"
          value={address}
          size="small"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              submitInputValue();
            }
          }}
          fullWidth
          onChange={handleAddressChange}
          variant="outlined"
          color="secondary"
          InputProps={{
            endAdornment: (
              <IconButton onClick={submitInputValue}>
                <AiOutlineSearch size={18} />
              </IconButton>
            ),
          }}
        />
      </div>
    </div>
  );
};
export default Header;
