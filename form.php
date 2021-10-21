<?php

$msg = '';
$msgClass = '';

if (filter_has_var(INPUT_POST, 'submit')) {
    //Get form data
    $email = $_POST['email'];
    $name = $_POST['name'];
    $phone = $_POST['phone'];
    $message = $_POST['message'];

    //check required fields

    if (!empty($email) && !empty($name) && !empty($phone) && !empty($message)) {
        if (filter_var($email, FILTER_VALIDATE_EMAIL) === false) {
            $msg = 'Please use a valid email';
            $msgClass = 'alert-danger';
        }
        if (!is_numeric($phone) && strlen($phone) < 8) {
            echo strlen($phone);
            $msg = 'Please use a valid number';
            $msgClass = 'alert-danger';
        }
    } else {
        $msg = 'Please fill in all fields';
        $msgClass = 'alert-danger';
    }
}

?>

<?php include "header.php" ?>
<link rel="stylesheet" href="formStyle.css">
<form action="<?php echo $_SERVER['PHP_SELF']; ?>" method="post">
    <div class="container">
        <div class="container">
            <h1 style="text-align: left;">Contact us</h1>
        </div>
        <div class="container">
            <h4 style="text-align:left">We'd love to hear from you!</h4>
        </div>
        <!-- add ana alert -->
        <?php if ($msg != '') : ?>
            <div role="alert" class="alert <?php echo "$msgClass" ?>">
                <?php echo "$msg"; ?>
            </div>
        <?php endif; ?>
        <div class="container input-container">
            <div class="container">
                <div class="styled-input wide container">
                    <input type="text" name="name" value="<?php echo isset($_POST['name']) ? $name : '' ?>" required />
                    <label>Name</label>
                </div>
            </div>
            <div class="container">
                <div class="styled-input container">
                    <input type="text" name="email" value="<?php echo isset($_POST['email']) ? $email : '' ?>" required />
                    <label>Email</label>
                </div>
            </div>
            <div class="container">
                <div class="styled-input container" style="float:right;">
                    <input type="text" name="phone" value="<?php echo isset($_POST['phone']) ? $phone : '' ?>" required />
                    <label>Phone Number</label>
                </div>
            </div>
            <div class="container">
                <div class="styled-input wide container">
                    <textarea required name="message"><?php echo isset($_POST['message']) ? $message : '' ?></textarea>
                    <label>Message</label>
                </div>
            </div>
            <div class="container">
                <button type="submit" class="btn-lrg submit-btn btn-dark color" name="submit" id="btn">Send Message</button>
            </div>



        </div>
    </div>
</form>


<?php include "footer.php" ?>