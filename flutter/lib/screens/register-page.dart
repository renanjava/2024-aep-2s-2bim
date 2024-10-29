// ignore_for_file: file_names
import 'package:app_aep/components/button-padding.dart';
import 'package:app_aep/components/page.dart';
import 'package:app_aep/screens/login-page.dart';
import 'package:flutter/material.dart';

class RegisterPage extends StatelessWidget {
  const RegisterPage({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return CustomPage(
      screenText: 'Tela de Registro',
      emailField: TextEditingController(),
      botoes: const [
        CustomButtonPadding(
          textValue: 'Acessar',
          toPage: LoginPage(),
        ),
        CustomButtonPadding(
          textValue: 'Registrar',
          toPage: LoginPage(),
        ),
      ],
    );
  }
}
