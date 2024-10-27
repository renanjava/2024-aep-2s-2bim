// ignore_for_file: file_names
import 'package:app_aep/widgets/custom-button-padding.dart';
import 'package:app_aep/widgets/custom-textfield.dart';
import 'package:flutter/material.dart';

class CustomPage extends StatelessWidget {
  final TextEditingController usernameField = TextEditingController();
  final TextEditingController? emailField;
  final TextEditingController passwordField = TextEditingController();
  final String screenText;

  CustomPage({
    super.key,
    this.emailField,
    required this.screenText,
  });


  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: Text(screenText),
          backgroundColor: Colors.blue[400],
        ),
        body: Padding(
          padding: const EdgeInsets.fromLTRB(250.0, 115.0, 250.0, 0.0),
          child: Column(
            children: [
              CustomTextField(
                  icon: Icons.account_circle,
                  controller: usernameField,
                  labelText: 'Username',
                  hintText: 'Digite seu username'),
              if (emailField != null)
                CustomTextField(
                  icon: Icons.alternate_email_outlined,
                  controller: emailField!,
                  labelText: 'Email',
                  hintText: 'Digite seu email'),
              CustomTextField(
                  icon: Icons.lock_outline,
                  controller: passwordField,
                  labelText: 'Password',
                  hintText: 'Digite sua password'),
              Padding(
                  padding: const EdgeInsets.fromLTRB(0.0, 20.0, 0.0, 0.0),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      if (emailField == null) const CustomButtonPadding(textValue: 'Acessar'),
                      const CustomButtonPadding(textValue: 'Registrar'),
                    ],
                  )),
            ],
          ),
        ),
      ),
    );
  }
}
