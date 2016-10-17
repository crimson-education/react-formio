import React from 'react';
import valueMixin from './mixins/valueMixin';
import SignaturePad from 'react-signature-pad';

module.exports = React.createClass({
  displayName: 'Signature',
  mixins: [valueMixin],
  onEnd: function(type, image) {
    this.setValue(this.signature.toDataURL());
  },
  componentDidMount: function() {
    this.signature = this.refs[this.props.component.key];
    if (this.state.value) {
      this.signature.fromDataURL(this.state.value);
    }
  },
  clearSignature: function(ref) {
    var signature = this.refs[ref];
    signature.clear();
  },
  getElements: function() {
    var footerStyle = {textAlign: 'center', color:'#C3C3C3'};
    var footerClass = 'formio-signature-footer' + (this.props.component.validate.required ? ' required' : '');
    var ref = this.props.component.key;
    var styles = {
      height: 'auto',
      width: this.props.component.width
    };
    return (
      <div>
        <span className=" glyphicon glyphicon-refresh"  onClick={this.clearSignature.bind(null, ref)}/>
        <div style={styles}>
          <SignaturePad
            ref={this.props.component.key}
            {...this.props.component}
            onEnd={this.onEnd}
          />
        </div>
        <div className={footerClass} style={footerStyle}>{this.props.component.footer}</div>
      </div>
    );
  }
});
