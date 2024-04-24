import { Menu, MenuProps } from '@mui/material'
import React from 'react'

type FileMenuProps = {
  anchorE1: null | HTMLElement;
};

const FileMenu = ({ anchorE1 }: FileMenuProps) => {
  return <Menu open={false} anchorEl={anchorE1}>xvsdf</Menu>;
};
export default FileMenu