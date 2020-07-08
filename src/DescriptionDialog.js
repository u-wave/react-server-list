import React from 'react';
import PropTypes from 'prop-types';
import stripIndent from 'strip-indent';
import Markdown from 'react-markdown';
import Button from '@material-ui/core/Button';
import MuiDialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import './DescriptionDialog.css';

const Dialog = withMobileDialog()(MuiDialog);

function DescriptionDialog({ server, isOpen, onCloseDescription }) {
  return (
    <Dialog className="usl-DescriptionDialog" open={isOpen} onClose={onCloseDescription}>
      <DialogTitle>
        {server.name}
      </DialogTitle>
      <DialogContent>
        <div className="usl-DescriptionDialog-markdown">
          <Markdown source={stripIndent(server.description)} />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCloseDescription}>
          Close
        </Button>
        <Button
          color="primary"
          variant="raised"
          href={server.url}
        >
          Join
        </Button>
      </DialogActions>
    </Dialog>
  );
}

DescriptionDialog.propTypes = {
  server: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
  isOpen: PropTypes.bool,
  onCloseDescription: PropTypes.func.isRequired,
};

export default DescriptionDialog;
