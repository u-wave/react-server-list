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
import { makeStyles } from '@material-ui/styles';

const Dialog = withMobileDialog()(MuiDialog);

const useStyles = makeStyles({
  markdown: {
    color: 'rgba(255, 255, 255, 0.6)',
  },
}, { name: 'DescriptionDialog' });

function DescriptionDialog({ server, isOpen, onCloseDescription }) {
  const classes = useStyles();

  return (
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
