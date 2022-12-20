import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {FC, ReactNode} from "react";
import {Close} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";

interface Props {
    children?: ReactNode;
    isOpen?: boolean;
    callback?: any;
}

 const DialogWindow:FC<Props> = ({children, isOpen,callback}) => {
    const [open, setOpen] = React.useState(isOpen);
    const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');

    const handleClickOpen = (scrollType: DialogProps['scroll']) => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    // const handleClose = () => {
    //     setOpen(false);
    // };

    const descriptionElementRef = React.useRef<HTMLElement>(null);
    React.useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    return (
        <>
            {open && <Dialog
              open={open}
              onClose={callback}
              scroll={scroll}
              aria-labelledby="scroll-dialog-title"
              aria-describedby="scroll-dialog-description"
            >

              <DialogTitle sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}} id="scroll-dialog-title">
                <span>Edit product</span>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={callback}
                  color="secondary"
                >
                  <Close />
                </IconButton>
              </DialogTitle>
              <DialogContent dividers={scroll === 'paper'}>
                  {children}
{/*                <DialogContentText*/}
{/*                  id="scroll-dialog-description"*/}
{/*                  ref={descriptionElementRef}*/}
{/*                  tabIndex={-1}*/}
{/*                >*/}
{/*                    {[...new Array(50)]*/}
{/*                        .map(*/}
{/*                            () => `Cras mattis consectetur purus sit amet fermentum.*/}
{/*Cras justo odio, dapibus ac facilisis in, egestas eget quam.*/}
{/*Morbi leo risus, porta ac consectetur ac, vestibulum at eros.*/}
{/*Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,*/}
{/*                        )*/}
{/*                        .join('\n')}*/}
{/*                </DialogContentText>*/}
              </DialogContent>
              {/*<DialogActions>*/}
              {/*  <Button onClick={callback}>Cancel</Button>*/}
              {/*  <Button onClick={callback}>Subscribe</Button>*/}
              {/*</DialogActions>*/}
            </Dialog>
            }
        </>
    );
}

export default DialogWindow;