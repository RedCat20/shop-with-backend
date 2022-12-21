import {useState, MouseEvent,useEffect,useRef} from 'react';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import {DialogContent,DialogTitle,IconButton} from '@mui/material';
import {FC, ReactNode} from "react";
import {Close} from "@mui/icons-material";

interface Props {
    children?: ReactNode;
    isOpen?: boolean;
    //callback: ((product: IProduct, id?: string) => void);
    callback: () => void;
}

 const DialogWindow:FC<Props> = ({children, isOpen,callback}) => {
    const [scroll, setScroll] = useState<DialogProps['scroll']>('paper');

    const descriptionElementRef = useRef<HTMLElement>(null);
    useEffect(() => {
        if (isOpen) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [isOpen]);

    return (
        <>
            {isOpen && <Dialog
              open={isOpen}
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
                  onClick={(e: MouseEvent<HTMLButtonElement>) => callback()}
                  color="secondary"
                >
                  <Close />
                </IconButton>
              </DialogTitle>
              <DialogContent dividers={scroll === 'paper'}>
                  {children}
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