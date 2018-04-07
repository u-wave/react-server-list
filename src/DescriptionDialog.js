import React from 'react';
import PropTypes from 'prop-types';
import stripIndent from 'strip-indent';
import Markdown from 'react-markdown';
import Button from 'material-ui/Button';
import MuiDialog, {
  DialogTitle,
  DialogContent,
  DialogActions,
  withMobileDialog,
} from 'material-ui/Dialog';

const Dialog = withMobileDialog()(MuiDialog);

const DescriptionDialog = ({
  server,
  isOpen,
  onCloseDescription,
}) => (
  <Dialog open={isOpen} onClose={onCloseDescription}>
    <DialogTitle>
      {server.name}
    </DialogTitle>
    <DialogContent>
      <div className="markdown">
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
    <style jsx>{`
      .markdown {
        color: rgba(255, 255, 255, 0.6);
      }
    `}
    </style>
  </Dialog>
);

DescriptionDialog.propTypes = {
  server: PropTypes.shape({
  }).isRequired,
  isOpen: PropTypes.bool,
  onCloseDescription: PropTypes.func.isRequired,
};

export default DescriptionDialog;
