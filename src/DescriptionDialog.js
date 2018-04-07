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
import { withStyles } from 'material-ui/styles';

const Dialog = withMobileDialog()(MuiDialog);

const enhance = withStyles({
  markdown: {
    color: 'rgba(255, 255, 255, 0.6)',
  },
}, { name: 'DescriptionDialog' });

const DescriptionDialog = ({
  classes,
  server,
  isOpen,
  onCloseDescription,
}) => (
  <Dialog open={isOpen} onClose={onCloseDescription}>
    <DialogTitle>
      {server.name}
    </DialogTitle>
    <DialogContent>
      <div className={classes.markdown}>
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

DescriptionDialog.propTypes = {
  classes: PropTypes.shape({
    markdown: PropTypes.string.isRequired,
  }).isRequired,
  server: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
  isOpen: PropTypes.bool,
  onCloseDescription: PropTypes.func.isRequired,
};

export default enhance(DescriptionDialog);
