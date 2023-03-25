export default function GlobalStyles() {
  return (
    <style global jsx>
      {`
        @import url("https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;700&display=swap");

        *,
        *:before,
        *:after {
          box-sizing: border-box;
          -webkit-tap-highlight-color: transparent;
        }

        html {
          width: 100%;
          height: 100%;
        }

        body {
          height: 100%;
          -webkit-font-smoothing: antialiased;
          font-family: "DM Sans", sans-serif;
          font-weight: 400;
          color: #6d6d72;
        }

        #__next {
          height: 100%;
        }

        a,
        a:visited {
          color: inherit;
          text-decoration: none;
          transition: color 0.25s;
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6,
        p {
          margin: 0;
        }

        b,
        strong {
          font-weight: 700;
        }

        // todo: clean this styles

        .input-group-rounded {
          max-width: 700px;
        }
        .input-group-rounded .form-control {
          border-radius: 40px 0 0 40px;
          padding: 20px 30px;
        }
        .input-group-rounded .form-control::placeholder {
          /* Chrome, Firefox, Opera, Safari 10.1+ */
          color: #dcdbdb;
          opacity: 1; /* Firefox */
        }
        .input-group-rounded .form-control:-ms-input-placeholder {
          /* Internet Explorer 10-11 */
          color: #dcdbdb;
        }
        .input-group-rounded .form-control::-ms-input-placeholder {
          /* Microsoft Edge */
          color: #dcdbdb;
        }
        .input-group-rounded .btn {
          border-radius: 0 40px 40px 0;
        }
        @media (max-width: 992px) {
          .input-group-rounded .form-control {
            border-radius: 40px 0 0 40px;
            padding: 10px 20px;
          }
        }

        .accordion .accordion-item {
          margin-bottom: 20px;
          border: 1px solid #eaecee;
          border-radius: 20px;
          overflow: hidden;
        }
        .accordion .accordion-header .accordion-button {
          color: #0e234b;
          border: none;
          box-shadow: none;
          background-color: #fff;
          font-weight: 600;
          padding: 10px 30px;
        }
        .accordion .accordion-header .accordion-button::after {
          content: "+";
          background-image: none;
          font-size: 44px;
          font-weight: 400;
          width: auto;
          height: auto;
        }
        .accordion .accordion-header .accordion-button:not(.collapsed)::after {
          content: "-";
          color: #fd576c;
        }
        .accordion .accordion-header .accordion-button:not(.collapsed) {
          color: #fd576c;
        }
        .accordion .accordion-body {
          padding-top: 0;
          color: #6d6d72;
          font-size: 16px;
        }

        .accordion.accordionV2 .accordion-item {
          border-radius: 10px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }
        .accordion.accordionV2
          .accordion-header
          .accordion-button:not(.collapsed)::after {
          color: #fff;
        }
        .accordion.accordionV2
          .accordion-header
          .accordion-button:not(.collapsed) {
          color: #fff;
          background-color: #fd576c;
        }
        .accordion.accordionV2 .accordion-body {
          padding-top: 20px;
          color: #0f123d;
        }

        .form-s2 .form-label {
          color: #6d6d72;
          font-size: 18px;
        }
        .form-s2 .form-control {
          background-color: #eaecee;
          border-color: transparent;
          font-size: 18px;
          padding: 15px 30px;
          border-radius: 5px;
          color: #0e234b;
          box-shadow: none !important;
        }
        .form-s2 .form-control:hover,
        .form-s2 .form-control:focus {
          border-color: #fd576c;
        }
        .form-s2 p {
          color: #7377a9;
          font-size: 18px;
        }
        .form-s2 .form-check {
          color: #0e234b;
          font-size: 18px;
        }
        .form-s2 .form-check .form-check-input:checked {
          background-color: #fd576c;
          border-color: #fd576c;
        }
        @media (max-width: 992px) {
          .form-s2 .form-label {
            font-size: 16px;
          }
          .form-s2 .form-control {
            font-size: 16px;
            padding: 12px 20px;
          }
          .form-s2 p {
            font-size: 16px;
          }
          .form-s2 .form-check {
            font-size: 16px;
          }
        }

        .sidebar {
          background-color: #fff !important;
          border-radius: 12px;
          border: none;
          padding: 0px 10px;
          padding-top: 30px;
        }
        .sidebar .card-title {
          font-size: 40px;
          color: #0e234b;
          font-weight: 700;
        }
        .sidebar .list-group {
          background-color: transparent;
        }
        .sidebar .list-group .list-group-item {
          color: #7377a9;
          font-size: 18px;
          border: none;
          padding: 10px 0;
          background-color: transparent;
          display: flex;
          justify-content: space-between;
        }
        .sidebar .list-group .list-group-item.border-b-1 {
          border-bottom: 1px solid #ced2d9;
          margin-bottom: 20px;
        }
        .sidebar .list-group .list-group-item h2 {
          font-size: 30px;
        }
        .sidebar .list-group .list-group-item strong {
          color: #0e234b;
          font-weight: 700;
        }
        @media (max-width: 40px) {
          .sidebar {
            padding: 0 10px !important;
          }
          .sidebar .card-title {
            font-size: 20px;
          }
          .sidebar .list-group .list-group-item {
            font-size: 16px;
          }
          .sidebar .list-group .list-group-item h2 {
            font-size: 22px;
          }
        }

        .card-s2 {
          color: #7377a9;
          border: none;
          background-color: #ecf2fd;
          border-radius: 12px;
          font-size: 18px;
          padding: 40px;
          margin-bottom: 30px;
        }
        .card-s2 .card-title {
          color: #0e234b;
          font-weight: 700;
          font-size: 36px;
          margin-bottom: 10px;
        }
        .card-s2 .card-title.large {
          font-size: 40px;
        }
        .card-s2 .form-control {
          background-color: #dcdbdb;
          box-shadow: none;
          border: none;
          padding: 15px 30px;
        }
        .card-s2 .card {
          padding: 0;
          border-radius: 8px;
          overflow: hidden;
          background-color: #fff;
        }
        .card-s2 .card .card-title {
          font-size: 16px;
          margin-bottom: 0;
          text-align: center;
        }

        .card-s3 {
          background-color: #fff;
          box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
          border-radius: 12px;
          padding: 15px;
        }
        .card-s3 .card {
          margin: 7px 0;
        }

        .progress {
          background-color: #ffdbdf;
          height: 7px;
        }
        .progress .progress-bar {
          background-color: #fd576c;
        }

        .list-s2 li {
          color: #7377a9;
          font-size: 18px;
          line-height: 28px;
          position: relative;
          padding-left: 26px;
          margin-bottom: 8px;
        }
        .list-s2 li .icon {
          position: absolute;
          top: 7px;
          left: 0;
          transform: scale(1) !important;
        }

        #nprogress {
          pointer-events: none;
        }

        #nprogress .bar {
          position: fixed;
          z-index: 9999;
          top: 0;
          left: 0;
          width: 100%;
          height: 3px;
          background-color: #000000;
        }

        @keyframes play {
          from {
            background-position: 0 0;
          }
          to {
            background-position: -98% 0;
          }
        }
        .btn {
          padding: 10px 30px;
        }
        .btn-sm {
          font-size: 14px;
          padding: 7px 30px;
        }
        .btn-lg {
          font-size: 18px;
          padding: 12px 40px;
        }
        .btn-primary {
          color: #fff !important;
          background-color: #fd576c;
          border-color: #fd576c;
          box-shadow: 0 0 0 4px #fd576c50;
          transition: 0.2s;
        }
        .btn-primary:hover {
          background-color: #433af6;
          border-color: #433af6;
          box-shadow: 0 0 0 0 #fd576c50;
        }
        .btn-primary.active,
        .btn-primary:active {
          box-shadow: 0 0 0 4px #0a58ca82 !important;
        }
        .btn-primary:disabled {
          background-color: #fd576c;
          box-shadown: none;
          border: none;
        }
        .btn-light-2 {
          color: #0f123d !important;
          font-weight: 600;
          border: 1px solid #bcc1cb;
        }
        .btn-light-2:hover {
          color: #fff !important;
          background-color: #fd576c;
          border-color: #fd576c;
          box-shadow: 0 0 0 0 #fd576c50;
        }

        .header .navbar-toggler {
          color: #fff;
          border: none;
          box-shadown: none !important;
        }
        .header .navbar-toggler span {
          filter: invert(1);
        }
        @media (max-width: 992px) {
          .header .navbar-nav {
            padding: 15px;
            background: #1f2253;
          }
        }

        .modal {
        }
        .modal .modal-content {
          border-radius: 20px;
          padding: 20px 20px 40px;
        }
        .modal .modal-content .modal-body {
          text-align: center;
        }
        .modal .modal-header {
          border-bottom: none;
        }
        .modal .modal-header .btn-close {
          box-shadow: none !important;
          opacity: 1;
          background: transparent
            url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23FD576C'%3e%3cpath d='M.293.293a1 1 0 011.414 0L8 6.586 14.293.293a1 1 0 111.414 1.414L9.414 8l6.293 6.293a1 1 0 01-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 01-1.414-1.414L6.586 8 .293 1.707a1 1 0 010-1.414z'/%3e%3c/svg%3e");
        }

        .table-s2 {
          text-align: center;
          border-radius: 8px;
          overflow: hidden;
        }
        .table-s2 thead th {
          color: #fff;
          background-color: #0f123d;
          font-size: 20px;
          padding: 12px 15px;
        }
        .table-s2 tbody td {
          padding: 20px 15px;
          width: 25%;
          color: #5d5d6a;
          font-size: 16px;
          vertical-align: middle;
        }
        .table-s2 tbody td:first-child {
          color: #0f123d;
          font-weight: 600;
          font-size: 20px;
          padding: 12px 15px;
        }
      `}
    </style>
  );
}
